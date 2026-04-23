import * as z from "zod";

export const infoSchema = z.object({
  name: z.string().min(1, "Tên dự án không được để trống"),
  prjLevel: z.string().min(1, "Cấp công trình không được để trống"),
  location: z.string().min(1, "Địa điểm không được để trống"),
  capital: z.string().min(1, "Nguồn vốn không được để trống"),
  role: z.string().min(1, "Vai trò không được để trống"),
})

export const pestelSchema = z.object({
  political: z.array(z.string().min(1, "Nội dung không được để trống")).default([]),
  economic: z.array(z.string().min(1, "Nội dung không được để trống")).default([]),
  social: z.array(z.string().min(1, "Nội dung không được để trống")).default([]),
  technological: z.array(z.string().min(1, "Nội dung không được để trống")).default([]),
  environmental: z.array(z.string().min(1, "Nội dung không được để trống")).default([]),
  legal: z.array(z.string().min(1, "Nội dung không được để trống")).default([]),
})

export const swotSchema = z.object({
  strengths: z.array(z.string().min(1, "Nội dung không được để trống")).default([]),
  weaknesses: z.array(z.string().min(1, "Nội dung không được để trống")).default([]),
  opportunities: z.array(z.string().min(1, "Nội dung không được để trống")).default([]),
  threats: z.array(z.string().min(1, "Nội dung không được để trống")).default([]),
})

export const objectiveSchema = z.object({
  name: z.string().min(1, "Tên mục tiêu không được để trống"),
})

export const riskSchema = z.object({
  name: z.string().min(1, "Tên rủi ro không được để trống"),
  probability_level: z.number().default(0),
  impact_level: z.number().default(0),
  risk_level: z.number().default(0),
  strategy: z.string().default(""),
  solutions: z.array(z.object({
    personInCharge: z.string().default(""),
    content: z.string().default(""),
  })).default([]),
})

export const projectSchema = z.object({
  info: infoSchema,
  pestel: pestelSchema,
  swot: swotSchema,
  objectives: z.array(objectiveSchema).default([]),
  risks: z.array(riskSchema).default([]),
})