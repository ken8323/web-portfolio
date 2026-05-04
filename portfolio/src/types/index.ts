import type { Task, User, Status } from '@prisma/client';

export type { Task, User, Status };

export type CreateTaskInput = {
  title: string;
  description?: string;
  status?: Status;
};

import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}
