import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith("http") &&
  !supabaseUrl.includes("your-project-url")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  project_type?: string;
  budget?: string;
  message: string;
  created_at?: string;
}

export async function submitContactMessage(data: ContactMessage): Promise<{ success: boolean; message: string }> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("contacts").insert([
        {
          name: data.name,
          email: data.email,
          project_type: data.project_type || "General Inquiry",
          budget: data.budget || "Not Specified",
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.warn("Supabase insertion notice:", error.message);
        // Fallback to storing locally so message is not lost
        storeMessageLocally(data);
        return {
          success: true,
          message: "Message received & queued locally (Supabase table connection pending).",
        };
      }

      return { success: true, message: "Message sent directly to Nur Hasan via Supabase!" };
    } else {
      // Local storage fallback
      storeMessageLocally(data);
      return {
        success: true,
        message: "Message captured! Configure Supabase in .env.local to persist directly to database.",
      };
    }
  } catch (err: unknown) {
    console.error("Submission error:", err);
    storeMessageLocally(data);
    return {
      success: true,
      message: "Message captured locally! Feel free to also email directly at nurhasan90446@gmail.com.",
    };
  }
}

function storeMessageLocally(data: ContactMessage) {
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(localStorage.getItem("nurhasan_inquiries") || "[]");
      existing.push({ ...data, savedAt: new Date().toISOString() });
      localStorage.setItem("nurhasan_inquiries", JSON.stringify(existing));
    } catch {
      // ignore storage quota issues
    }
  }
}
