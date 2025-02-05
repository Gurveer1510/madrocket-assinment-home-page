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
import { updateDocument } from "src/db/db";
import { Student } from "src/types";

import { regexPatterns, countryRegexPatterns } from "src/regex";

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

interface UpdateModalProps {
    docId: string
    data: Student
}

const UpdateModal: React.FC<UpdateModalProps> = ({
    docId,
    data
}) => {
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState("")
    const { handleSubmit, watch, control, reset, formState: { errors } } = useForm<Student>({
        defaultValues: {
            ...data
        },
    });
    const selectedCountry = watch('country');


    const handleOpen = () => {
        console.log(data)
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        reset(); // Reset the form on close
    };

    const onSubmit = async (formData: Student) => {
        if (await updateDocument(formData, docId)) {
            router.refresh()
            handleClose(); // Close the modal on form submission
        } else {
            setError("Something went wrong!")
        }
    };

    return (
        <>
            <Button

                sx={{
                    color: "#00000",
                    backgroundColor: "#FFFF",
                    ":hover": {
                        backgroundColor: "#F6F7F8"
                    }
                }}
                onClick={handleOpen}
            >
                Edit
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

                            {/* Country Field */}
                            <Controller
                                name="country"
                                control={control}
                                rules={{ required: "Country is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Country"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.country}
                                        helperText={errors.country?.message}
                                    />
                                )}
                            />

                            {/* Gender Field */}
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
                                    validate: (value) => {
                                        const countryCode = selectedCountry as 'US' | 'CA' | 'UK' | 'IN';
                                        return (
                                            countryRegexPatterns[countryCode].test(value) ||
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

                            <Controller
                                name="enrollmentNumber"
                                control={control}
                                rules={{
                                    required: "Enrollment Number is required",
                                    pattern: {
                                        value: regexPatterns.enrollmentNumber,
                                        message: "Only alphanumeric characters are allowed",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Enrollment Number"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.enrollmentNumber}
                                        helperText={errors.enrollmentNumber?.message}
                                    />
                                )}
                            />

                            {/* Class/Grade */}
                            <Controller
                                name="classGrade"
                                control={control}
                                rules={{
                                    required: "Class/Grade is required",
                                    pattern: {
                                        value: regexPatterns.classGrade,
                                        message: "Invalid class/grade format",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Class/Grade"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.classGrade}
                                        helperText={errors.classGrade?.message}
                                    />
                                )}
                            />

                            {/* Email */}
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: regexPatterns.email,
                                        message: "Invalid email format",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />

                            {/* Parent/Guardian Name */}
                            <Controller
                                name="parentName"
                                control={control}
                                rules={{
                                    required: "Parent/Guardian Name is required",
                                    pattern: {
                                        value: regexPatterns.parentName,
                                        message: "Only alphabetic characters and spaces allowed",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Parent/Guardian Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.parentName}
                                        helperText={errors.parentName?.message}
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
                                Update
                            </Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default UpdateModal;