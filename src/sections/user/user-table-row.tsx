import { useState, useCallback } from 'react';
import { deleteStudent } from 'src/db/db';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import { Button } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { Iconify } from 'src/components/iconify';
import { Student } from 'src/types';

import { useRouter } from 'src/routes/hooks';
import UpdateModal from 'src/modal/update-modal';

// ----------------------------------------------------------------------

export type UserProps = Student;

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const router = useRouter()
  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleDelete = async (docId: string) => {
    if (await deleteStudent(docId)) {
      router.refresh()
    } else {
      alert("no")
    }
  }

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          {row.first_name}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.last_name}
        </TableCell>

        <TableCell align='left'>{row.age}</TableCell>

        <TableCell align='left'>{row.gender}</TableCell>

        <TableCell align="left">
          {row.city}
        </TableCell>

        <TableCell>
          {
            row.country
          }
        </TableCell>
        <TableCell>
          {
            row.phone
          }
        </TableCell>
        <TableCell>
          {
            row.zipcode
          }
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem>
            <Iconify icon="solar:pen-bold" color='#007BFF'/>
            <UpdateModal docId={row.docId!} data={row}/>
          </MenuItem>

          <MenuItem onClick={() => handleDelete(row.docId!)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            <Button color='error'>Delete</Button>
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
