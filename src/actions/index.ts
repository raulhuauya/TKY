import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";
import { countries } from "../data/countries";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Create DOMPurify instance
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Validation and sanitization functions
const sanitizeInput = (input: string): string => {
    if (!input) return '';
    // Remove any HTML/JavaScript
    const clean = purify.sanitize(input.trim(), {
        ALLOWED_TAGS: [], // No HTML tags allowed
        ALLOWED_ATTR: [] // No attributes allowed
    });
    // Escape special characters
    return clean
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\\/g, '&#x5C;');
};

const phoneRegex = /^[0-9+\-\s()]{6,20}$/;
const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;

export const server = {
    send: defineAction({
        accept: "form",
        input: z.object({
            first_name: z.string()
                .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
                .max(50, { message: "El nombre no puede exceder 50 caracteres" })
                .regex(nameRegex, { message: "El nombre contiene caracteres no válidos" })
                .transform(sanitizeInput),
            email: z.string()
                .min(1, { message: "Email es obligatorio" })
                .email("Por favor ingresa un email válido")
                .transform(sanitizeInput),
            company: z.string()
                .max(100, { message: "El nombre de la empresa no puede exceder 100 caracteres" })
                .transform(sanitizeInput)
                .optional(),
            phone: z.string()
                .regex(phoneRegex, { message: "Número de teléfono no válido" })
                .transform(sanitizeInput)
                .optional(),
            country: z.string()
                .refine(val => countries.some(c => c.code === val), {
                    message: "País no válido"
                })
                .transform(sanitizeInput),
            message: z.string()
                .min(10, { message: "El mensaje debe tener al menos 10 caracteres" })
                .max(1000, { message: "El mensaje no puede exceder 1000 caracteres" })
                .transform(sanitizeInput)
        }),
        handler: async ({ first_name, email, company, phone, country, message }) => {
            try {
                const countryObj = countries.find(c => c.code === country);
                const countryName = countryObj ? countryObj.name : country;

                const emailTemplate = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #333;">Nuevo mensaje de contacto de tu página web</h1>
                        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
                            <p><strong>Nombre:</strong> ${first_name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Compañía:</strong> ${company || 'No especificada'}</p>
                            <p><strong>Número:</strong> ${phone || 'No especificado'}</p>
                            <p><strong>País:</strong> ${countryName}</p>
                            <p><strong>Mensaje:</strong></p>
                            <p style="white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                `;

                const { data, error } = await resend.emails.send({
                    from: "Contacto <contacto@contacto.tukuylabs.com>",
                    to: ["comercial@tukuylabs.com"],
                    subject: "Nuevo email de contacto",
                    html: emailTemplate
                });

                if (error) {
                    throw new Error("Error al enviar el email");
                }

                return {
                    success: true,
                    data
                };
            } catch (error) {
                throw new Error("Error en el servidor: " + (error as Error).message);
            }
        }
    })
}