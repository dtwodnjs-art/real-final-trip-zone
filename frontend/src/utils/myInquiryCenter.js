import { myInquiryThreadsSeed } from "../data/mypageData";

const INQUIRY_CENTER_KEY = "tripzone-my-inquiry-center";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function sortByLatest(rows) {
  return [...rows].sort((a, b) => Number(b.id) - Number(a.id));
}

export function readMyInquiryThreads() {
  if (!canUseStorage()) return sortByLatest(myInquiryThreadsSeed);

  try {
    const raw = window.localStorage.getItem(INQUIRY_CENTER_KEY);
    if (!raw) return sortByLatest(myInquiryThreadsSeed);
    return sortByLatest(JSON.parse(raw));
  } catch {
    return sortByLatest(myInquiryThreadsSeed);
  }
}

export function writeMyInquiryThreads(rows) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(INQUIRY_CENTER_KEY, JSON.stringify(sortByLatest(rows)));
}

export function createMyInquiryThread(payload) {
  const rows = readMyInquiryThreads();
  const nextId = rows.reduce((max, row) => Math.max(max, Number(row.id)), 300) + 1;
  const createdAt = "방금 전";
  const nextRow = {
    id: nextId,
    title: payload.title,
    type: payload.type,
    status: "OPEN",
    lodging: payload.lodging || "미지정",
    bookingNo: payload.bookingNo || "예약 미연결",
    updatedAt: createdAt,
    createdAt,
    body: payload.body,
    preview: payload.body,
    messages: [{ id: 1, sender: "회원", time: createdAt, body: payload.body }],
  };
  writeMyInquiryThreads([nextRow, ...rows]);
  return nextRow;
}

export function updateMyInquiryThread(threadId, payload) {
  const rows = readMyInquiryThreads();
  const updated = rows.map((row) =>
    Number(row.id) === Number(threadId)
      ? {
          ...row,
          ...payload,
          updatedAt: "방금 수정",
          preview: payload.body ?? row.preview,
          body: payload.body ?? row.body,
          messages:
            payload.body && row.messages.length
              ? [{ ...row.messages[0], body: payload.body }, ...row.messages.slice(1)]
              : row.messages,
        }
      : row
  );
  writeMyInquiryThreads(updated);
  return updated.find((row) => Number(row.id) === Number(threadId)) ?? null;
}

export function deleteMyInquiryThread(threadId) {
  const rows = readMyInquiryThreads();
  writeMyInquiryThreads(rows.filter((row) => Number(row.id) !== Number(threadId)));
}

export function findMyInquiryThread(threadId) {
  return readMyInquiryThreads().find((row) => Number(row.id) === Number(threadId)) ?? null;
}
