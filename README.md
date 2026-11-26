# anon chat

A single-room, Discord-style anonymous chat with two channels (#general and #random).

- Random usernames and profile pictures. Only the owner can change them.
- Real-time messages, replies, reactions, pins, @mentions with autocomplete
- Photo and file attachments, drag and drop, paste from clipboard
- Saved photos: star any photo to keep it and resend it later instead of GIFs
- All chat history is wiped every 5 minutes (database rows and uploaded files)

Static frontend (GitHub Pages) with a Supabase backend (Postgres, Realtime, Storage, Edge Functions, pg_cron).
