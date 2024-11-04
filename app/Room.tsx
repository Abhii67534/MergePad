"use client";

import { ReactNode } from "react"; // Import ReactNode

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({roomId, children }: { children: ReactNode,roomId:string }) {
  return (
    <LiveblocksProvider 
    publicApiKey={"pk_dev_TWPEG5VFc_ikmskKiUgB71RBgMfdZixRhKUEZ_PRXUc5cLcFsCG9InuyS_3n8Cb2"}
    resolveUsers={async({userIds})=>{
      // const users = await getClerkUser();
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