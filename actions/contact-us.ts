"use server";

import { z } from "zod";
import { ContactFormSchema } from "@/schema";
import { db } from "@/lib/db";
export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const validatedData = ContactFormSchema.parse(formData);

    const contactMessage = await db.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        subject: validatedData.subject,
        message: validatedData.message,
      },
    });

    return {
      status: "success",
      message: "Message sent successfully! We'll get back to you soon.",
      data: contactMessage,
    };
  } catch (error) {
    console.error("❌ Error in submitContactForm:", error);

    return {
      status: "error",
      message:
        "There was an error submitting your message. Please try again later.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const getContactMessages = async () => {
  try {
    const messages = await db.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      status: "success",
      data: messages,
    };
  } catch {
    console.error("Error getting contacts messages.");
    return {
      success: false,
      status: "Failed to fetch messages.",
    };
  }
};

export const updateContactMessageStatus = async (
  id: string,
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "CLOSED",
  adminNotes?: string,
) => {
  try {
    const updatedMessage = await db.contactMessage.update({
      where: { id },
      data: {
        status,
        adminNotes,
      },
    });

    return {
      success: true,
      status: "success",
      message: "Message updated successfully!",
      data: updatedMessage,
    };
  } catch {
    console.error("Error updating contacts.");
    return {
      success: false,
      status: "Failed to update contacts.",
    };
  }
};
