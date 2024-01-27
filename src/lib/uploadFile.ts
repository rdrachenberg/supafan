/* eslint-disable @typescript-eslint/consistent-type-imports */
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "supabase/types";
import { nanoid } from 'nanoid';

export default async function uploadFile(supabase: SupabaseClient<Database>, file: File, bucket: string) {
   const name = getFileName(file.name);
   const { data: uploaded } = await supabase.storage.from(bucket).upload(name, file);
   // eslint-disable-next-line @typescript-eslint/await-thenable, @typescript-eslint/no-non-null-asserted-optional-chain
   const { data } = await supabase.storage.from(bucket).getPublicUrl(uploaded?.path!);

   return data.publicUrl;
}

function getFileName(filename: string) {
    const nameWithoutExtension = filename.includes('.') ? filename.substring(0, filename.lastIndexOf('.')) : filename;

    return `${nameWithoutExtension}-${nanoid()}`
}