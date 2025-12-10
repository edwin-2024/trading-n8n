
import { z } from 'zod';
import { id } from 'zod/locales';
export * from '../metadata';

export const SignupSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string()
});

export const SigninSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string()
});

export const CreateWorkflowSchema = z.object({
  nodes: z.array(z.object({
    id: z.string(),
    type: z.string(), // This was missing in schema but present in client
    data: z.object({
      kind: z.string(),
      metadata: z.any()
    }),
    credentials: z.any().optional(),
    position: z.object({
      x: z.number(),
      y: z.number(),
    })
  })),
  edges: z.array(z.object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
  }))
})

export const updateWorkflowSchema = z.object({
  nodes: z.array(z.object({
    id: z.string(),
    type: z.string(),
    data: z.object({
      kind: z.string(),
      metadata: z.any()
    }),
    credentials: z.any().optional(),
    position: z.object({
      x: z.number(),
      y: z.number(),
    })
  })),
  edges: z.array(z.object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
  }))
});