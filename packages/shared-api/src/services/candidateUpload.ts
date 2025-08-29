import { supabase } from '../supabaseClient';

export async function uploadCandidate(uri: string) {
  try {
    // NOTE: Expo file uri -> Blob
    const blob = await fetch(uri).then(r => r.blob());
    const path = `candidate-items/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
    
    const { error } = await supabase.storage
      .from('candidate-items')
      .upload(path, blob, { 
        contentType: 'image/jpeg', 
        upsert: false 
      });
      
    if (error) throw error;
    
    const { data } = supabase.storage
      .from('candidate-items')
      .getPublicUrl(path);
      
    return data.publicUrl;
    
  } catch (error) {
    console.warn('Upload failed, using local URI:', error);
    // Fallback: return local URI for development
    return uri;
  }
}