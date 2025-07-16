import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const imageFileSchema = z
    .any()
    .refine(
        (file): file is File => file instanceof File,
        "Gambar tidak boleh kosong."
    )
    .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        `Ukuran gambar tidak boleh lebih dari 2MB.`
    )
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Format yang didukung .jpg, .jpeg, .png dan .webp"
    );

const experienceSchema = z.object({
    position: z.string().min(1, "Posisi tidak boleh kosong."),
    company: z.string().min(1, "Perusahaan tidak boleh kosong."),
    description: z.string().min(1, "Deskripsi tidak boleh kosong."),
    start_date: z.string().min(1, "Tanggal mulai harus diisi."),
    end_date: z.string().min(1, "Tanggal selesai harus diisi."),
});

export const portfolioSchema = z.object({
    images: z.object({
        background_image: z.any().refine((val) => {
            return val !== null && val !== undefined && val !== "";
        }, "Gambar background tidak boleh kosong."),
        profile_image: z.any().refine((val) => {
            return val !== null && val !== undefined && val !== "";
        }, "Gambar profile tidak boleh kosong."),
    }),
    profile: z.object({
        name: z.string().min(1, "Nama tidak boleh kosong."),
        job_title: z.string().min(1, "Jabatan tidak boleh kosong."),
        job_description: z.string().min(1, "Deskripsi tidak boleh kosong."),
    }),

    experiences: z.array(experienceSchema),
});

export type PortfolioSchemaType = z.infer<typeof portfolioSchema>;
