'use client';
import { useEffect } from "react";
import { ErrorResponse } from "@/types";

export default function ErrorLogger({
  errors,
}: {
  errors: ErrorResponse[];
}) {
  useEffect(() => {
    for (let error of errors) {
      console.error('Server', error);
    }
  }, [errors]);

  return null;
}
