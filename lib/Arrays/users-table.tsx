import { User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const usersTableArray: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'email',
    header: 'email',
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  { accessorKey: 'provider', header: 'Provider' },
];
