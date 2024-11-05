"use client";

import { ReactNode } from "react"; // Import ReactNode

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import axios from "axios";

export function Room({roomId, children }: { children: ReactNode,roomId:string }) {
  return (
    <LiveblocksProvider 
    publicApiKey={"pk_dev_2pGKcq6c_xIYl468ajqd9hR93pgNIEXP1JHcomRnSKbfVoZ1t2Om5SMd-FyhpbbT"}
    resolveUsers={async({userIds})=>{
      const response = axios.get('http://localhost:3000/api/get-users',{
        params:{
          userIds
        }
      })
      const users= (await response).data;
      return users
    }}
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}