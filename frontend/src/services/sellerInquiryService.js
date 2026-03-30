import {
  appendSellerInquiryMessage,
  getOrCreateSellerInquiryRoom,
  readSellerInquiryMessages,
  readSellerInquiryRooms,
} from "../utils/sellerInquiryCenter";

export function getSellerInquiryRooms() {
  return readSellerInquiryRooms();
}

export function getSellerInquiryMessages(roomId) {
  return readSellerInquiryMessages(roomId);
}

export function sendGuestInquiryMessage(payload) {
  const room = getOrCreateSellerInquiryRoom({
    lodgingId: payload.lodgingId,
    lodging: payload.lodging,
    bookingNo: payload.bookingNo,
    title: payload.title,
    type: payload.type,
  });

  appendSellerInquiryMessage(room.id, {
    sender: "회원",
    body: payload.body,
  });

  return {
    room,
    messages: readSellerInquiryMessages(room.id),
  };
}

export function sendSellerInquiryReply(roomId, body) {
  appendSellerInquiryMessage(roomId, {
    sender: "판매자",
    body,
  });

  return readSellerInquiryMessages(roomId);
}
