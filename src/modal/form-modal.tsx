import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Backdrop,
    Fade,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem
} from "@mui/material";

import { useRouter } from "src/routes/hooks";
import { addDataWithAutoId } from "src/db/db";

type FormData = {
    first_name: string;
    last_name: string;
    age: number;
    city: string;
    country: string;
    gender: string;
    phone: string;
    zipcode: string;
};

type Country = 'US' | 'CA' | 'UK' | 'IN';

const regexPatterns: Record<Country, RegExp> = {
    // US: 5-digit code or 5+4 format (e.g., 12345 or 12345-6789)
    US: /^\d{5}(-\d{4})?$/,
    // Canada: Pattern for Canadian postal codes (e.g., A1A 1A1)
    CA: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
    // UK: Simplified pattern for UK postal codes (e.g., SW1A 1AA)
    UK: /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i,
    // India: 6-digit PIN code where the first digit is non-zero (e.g., 110001)
    IN: /^[1-9]\d{5}$/
};

const style = {
    position: "absolute" as const,
    height: 700,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    overflowY: "auto",
    '&::-webkit-scrollbar': {
        width: '0px', // Width of the scrollbar
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1', // Track color
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888', // Thumb color
        borderRadius: '10px', // Rounded thumb
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555', // Thumb hover color
    }
};

const FormModal: React.FC = () => {
    const router = useRouter();
    const { handleSubmit, watch, control, reset, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            first_name: "",
            last_name: "",
            age: 0,
            city: "",
            country: "",
            gender: "",
            phone: "",
            zipcode: "",
        },
    });
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState("");
    const selectedCountry = watch('country');



    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        reset(); // Reset the form on close
    };

    const onSubmit = async (data: FormData) => {
        if (await addDataWithAutoId(data)) {
            router.refresh();
            handleClose(); // Close the modal on form submission
        } else {
            setError("Something went wrong!");
        }
    };

    return (
        <>
            <Button
                sx={{
                    color: "#FFFFFF",
                    backgroundColor: "#007BFF",
                    ":hover": {
                        backgroundColor: "#0056b3"
                    }
                }}
                onClick={handleOpen}
            >
                New Student
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {
                            error && (
                                <Typography color="error">
                                    {error}
                                </Typography>
                            )
                        }
                        <Typography variant="h6" component="h2" mb={2}>
                            Add a new student
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* First Name Field */}
                            <Controller
                                name="first_name"
                                control={control}
                                rules={{ required: "First name is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.first_name}
                                        helperText={errors.first_name?.message}
                                    />
                                )}
                            />

                            {/* Last Name Field */}
                            <Controller
                                name="last_name"
                                control={control}
                                rules={{ required: "Last name is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Last Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.last_name}
                                        helperText={errors.last_name?.message}
                                    />
                                )}
                            />

                            {/* Age Field */}
                            <Controller
                                name="age"
                                control={control}
                                rules={{
                                    required: "Age is required",
                                    validate: (value) =>
                                        value > 0 || "Age must be a positive number",
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Age"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.age}
                                        helperText={errors.age?.message}
                                    />
                                )}
                            />

                            {/* City Field */}
                            <Controller
                                name="city"
                                control={control}
                                rules={{ required: "City is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="City"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.city}
                                        helperText={errors.city?.message}
                                    />
                                )}
                            />

                            {/* Gender Field (Radio Buttons for M/F) */}
                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: "Gender is required" }}
                                render={({ field }) => (
                                    <FormControl component="fieldset" error={!!errors.gender} fullWidth margin="normal">
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup {...field}>
                                            <FormControlLabel value="M" control={<Radio />} label="Male" />
                                            <FormControlLabel value="F" control={<Radio />} label="Female" />
                                        </RadioGroup>
                                        {errors.gender && <Typography color="error">{errors.gender.message}</Typography>}
                                    </FormControl>
                                )}
                            />

                            {/* Phone Field */}
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "Phone is required",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Phone must be 10 digits",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Phone"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.phone}
                                        helperText={errors.phone?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="country"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Country"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    >
                                        <MenuItem value="US">United States</MenuItem>
                                        <MenuItem value="CA">Canada</MenuItem>
                                        <MenuItem value="UK">United Kingdom</MenuItem>
                                        <MenuItem value="IN">India</MenuItem>
                                    </TextField>
                                )}
                            />
                            <Controller
                                name="zipcode"
                                control={control}
                                rules={{
                                    required: "Zipcode is required",
                                    // Custom validation using the selected country's regex pattern
                                    validate: (value) => {
                                        // If country is not selected or doesn't have a pattern, pass validation
                                        const countryCode = selectedCountry as 'US' | 'CA' | 'UK' | 'IN';
                                        // Test the input value against the regex for the selected country
                                        return (
                                            regexPatterns[countryCode].test(value) ||
                                            // Provide a custom error message if validation fails
                                            `Invalid zipcode/postal code format for ${selectedCountry}`
                                        );
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Zipcode"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.zipcode}
                                        helperText={errors.zipcode?.message}
                                        // Optionally, update the placeholder dynamically based on the selected country
                                        placeholder={
                                            selectedCountry === 'US'
                                                ? "12345 or 12345-6789"
                                                : selectedCountry === 'CA'
                                                    ? "A1A 1A1"
                                                    : selectedCountry === 'UK'
                                                        ? "SW1A 1AA"
                                                        : selectedCountry === 'IN'
                                                            ? "110001"
                                                            : ""
                                        }
                                    />
                                )}
                            />


                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Submit
                            </Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default FormModal;
