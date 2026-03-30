import { sellerInquiryMessagesSeed, sellerInquiryRoomsSeed } from "../data/mypageData";

const SELLER_INQUIRY_KEY = "tripzone-seller-inquiry-center";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function cloneSeedState() {
  return {
    rooms: sellerInquiryRoomsSeed.map((room) => ({ ...room })),
    messages: Object.fromEntries(
      Object.entries(sellerInquiryMessagesSeed).map(([roomId, rows]) => [roomId, rows.map((row) => ({ ...row }))]),
    ),
  };
}

function sortRooms(rows) {
  return [...rows].sort((a, b) => Number(b.id) - Number(a.id));
}

function readState() {
  const fallback = cloneSeedState();
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(SELLER_INQUIRY_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      rooms: sortRooms(parsed.rooms ?? fallback.rooms),
      messages: parsed.messages ?? fallback.messages,
    };
  } catch {
    return fallback;
  }
}

function writeState(state) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(
    SELLER_INQUIRY_KEY,
    JSON.stringify({
      rooms: sortRooms(state.rooms),
      messages: state.messages,
    }),
  );
}

export function readSellerInquiryRooms() {
  return readState().rooms;
}

export function readSellerInquiryMessages(roomId) {
  return readState().messages[String(roomId)] ?? [];
}

export function findSellerInquiryRoomByLodgingId(lodgingId) {
  return readSellerInquiryRooms().find((room) => Number(room.lodgingId) === Number(lodgingId)) ?? null;
}

export function createSellerInquiryRoom(payload) {
  const state = readState();
  const nextId = state.rooms.reduce((max, row) => Math.max(max, Number(row.id)), 300) + 1;
  const nextRoom = {
    id: nextId,
    lodgingId: payload.lodgingId,
    title: payload.title,
    type: payload.type ?? "LODGING",
    status: "OPEN",
    actor: "회원",
    lodging: payload.lodging,
    bookingNo: payload.bookingNo || "예약 미연결",
    updatedAt: "방금 전",
    preview: payload.preview ?? payload.body ?? "",
  };
  state.rooms = [nextRoom, ...state.rooms];
  state.messages[String(nextId)] = payload.body
    ? [{ id: 1, sender: payload.sender ?? "회원", time: "방금 전", body: payload.body }]
    : [];
  writeState(state);
  return nextRoom;
}

export function appendSellerInquiryMessage(roomId, payload) {
  const state = readState();
  const roomKey = String(roomId);
  const currentMessages = state.messages[roomKey] ?? [];
  const nextMessage = {
    id: currentMessages.reduce((max, row) => Math.max(max, Number(row.id)), 0) + 1,
    sender: payload.sender,
    time: "방금 전",
    body: payload.body,
  };

  state.messages[roomKey] = [...currentMessages, nextMessage];
  state.rooms = state.rooms.map((room) =>
    Number(room.id) === Number(roomId)
      ? {
          ...room,
          updatedAt: "방금 전",
          preview: payload.body,
          status: payload.sender === "판매자" ? "ANSWERED" : "OPEN",
        }
      : room,
  );
  writeState(state);
  return nextMessage;
}

export function getOrCreateSellerInquiryRoom(payload) {
  return findSellerInquiryRoomByLodgingId(payload.lodgingId) ?? createSellerInquiryRoom(payload);
}
