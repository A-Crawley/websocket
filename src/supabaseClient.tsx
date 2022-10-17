import { createClient, RealtimeChannel } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

let channel: RealtimeChannel;

export const subscribe = (
  room: string,
  subscription: string,
  subscriptionEvents: (arg: any) => void
) => {
  channel = supabase.channel(room);
  channel
    .on("broadcast", { event: subscription }, (payload) => {
      console.log("payload recieved", payload);
      subscriptionEvents(payload.payload);
    })
    .subscribe((status) => {});
};

export const sendMessage = (message: string | undefined) => {
  channel.send({
    type: "broadcast",
    event: "message",
    payload: { message: message },
  });
  console.log("Yep its sending");
};
