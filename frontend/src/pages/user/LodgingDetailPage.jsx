import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import StayMap from "../../components/common/StayMap";
import { lodgingReviews, lodgings, myBookingRows } from "../../data/siteData";

function buildGalleryImages(image) {
  return [image, `${image}&sat=-10`, `${image}&exp=5`];
}

function getRoomMeta(roomName) {
  if (roomName.includes("조식")) return "조식 포함";
  if (roomName.includes("환불형")) return "무료 취소 가능";
  return "기본 예약";
}

function getRoomCapacity(roomName) {
  const match = roomName.match(/최대\s*(\d+)인/);
  return match ? `최대 ${match[1]}인` : "기준 2인";
}

function getRoomTitle(roomName) {
  return roomName.split("·")[0].trim();
}

function getDiscountRate(price, originalPrice) {
  const current = Number(String(price).replace(/[^\d]/g, ""));
  const original = Number(String(originalPrice).replace(/[^\d]/g, ""));
  if (!current || !original || original <= current) return "";
  return `${Math.round(((original - current) / original) * 100)}%`;
}

function buildPropertyStory(lodging) {
  const stories = {
    1: [
      "해운대 바다를 가까이에서 마주할 수 있는 오션프론트 호텔로, 객실과 라운지에서 시간대마다 달라지는 해변 풍경을 즐길 수 있습니다.",
      "도보 3분 거리의 해변 접근성과 조식 포함 구성 덕분에 짧은 1박 일정부터 주말 여행까지 부담 없이 머물기 좋습니다.",
      "오션뷰 객실 즉시 확정과 24시간 프런트 운영으로 체크인 동선이 안정적이며, 전망 만족도가 특히 높은 숙소입니다.",
    ],
    2: [
      "제주의 돌담과 숲길 사이에 자리한 독채 숙소로, 바깥 동선의 간섭 없이 조용한 체류를 원하는 여행자에게 잘 맞습니다.",
      "독립 마당과 바비큐 존이 함께 구성되어 있어 가족 여행이나 소규모 프라이빗 스테이에 편안한 분위기를 제공합니다.",
      "연박 시 바비큐 세트 제공과 여유로운 공간 구성이 강점이며, 애월권 여행 동선과도 자연스럽게 연결됩니다.",
    ],
    3: [
      "바다를 정면으로 바라보는 리조트형 숙소로, 객실과 라운지에서 강릉 해변의 개방감을 길게 누릴 수 있습니다.",
      "인피니티풀과 오션 라운지가 함께 운영되어 짧은 일정에도 휴양지 같은 분위기를 빠르게 체감할 수 있습니다.",
      "주중 예약 시 라운지 쿠폰이 제공되어 조식과 휴식 동선을 한 번에 묶기 좋고, 1박 일정 만족도가 높은 편입니다.",
    ],
    4: [
      "성수의 카페 거리와 도심 라이프스타일을 가까이에서 즐길 수 있는 부티크 호텔로, 짧은 시티 스테이에 잘 어울립니다.",
      "루프탑 라운지와 셀프 체크인 구성이 함께 있어 도착부터 체크아웃까지 간결한 동선으로 이용할 수 있습니다.",
      "주말 체크인 고객 웰컴 드링크와 도심 접근성이 강점이며, 한강과 성수 상권을 함께 즐기기 좋은 위치입니다.",
    ],
    5: [
      "여수 바다와 노을을 함께 감상할 수 있는 마리나 스테이로, 객실 안에서도 항구 풍경의 분위기를 온전히 느낄 수 있습니다.",
      "테라스 스위트 구성과 웰컴 플래터 혜택이 더해져 커플 여행이나 기념일 숙소로 선택하기 좋은 편입니다.",
      "주요 관광 동선과도 가까워 저녁에는 숙소 풍경을, 낮에는 오동도와 해안 일정을 묶기 좋습니다.",
    ],
    6: [
      "경주의 한옥 감성을 현대적으로 정리한 스테이로, 온돌룸 중심의 차분한 분위기에서 여유로운 체류를 즐길 수 있습니다.",
      "체크인 고객 전통차 제공과 한옥 마당 분위기가 함께 어우러져 관광보다 휴식에 초점을 둔 일정에도 잘 어울립니다.",
      "황리단길과 주요 문화 유적 동선이 가까워 산책과 숙박을 자연스럽게 연결할 수 있는 점이 장점입니다.",
    ],
  };

  return stories[lodging.id] ?? [
    lodging.intro,
    lodging.review,
    `${lodging.benefit} ${lodging.highlights.slice(0, 2).join(" · ")}`,
  ];
}

function buildRoomOptions(lodging) {
  return [
    {
      name: lodging.room,
      image: lodging.image,
      price: lodging.price,
      originalPrice: "",
      badge: "기본가",
      description: lodging.highlights.slice(0, 2).join(" · "),
    },
    {
      name: `${lodging.room} · 조식 포함`,
      image: `${lodging.image}&sat=-12&exp=6`,
      price: `${Number(String(lodging.price).replace(/[^\d]/g, "")) + 20000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원",
      originalPrice: `${Number(String(lodging.price).replace(/[^\d]/g, "")) + 26000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원",
      badge: "인기",
      description: `조식 포함 · ${lodging.benefit}`,
    },
    {
      name: `${lodging.room} · 환불형`,
      image: `${lodging.image}&sat=8&exp=10`,
      price: `${Number(String(lodging.price).replace(/[^\d]/g, "")) + 12000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원",
      originalPrice: `${Number(String(lodging.price).replace(/[^\d]/g, "")) + 18000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원",
      badge: "무료 취소",
      description: lodging.cancellation,
    },
  ];
}

export default function LodgingDetailPage() {
  const { lodgingId } = useParams();
  const location = useLocation();
  const lodging = lodgings.find((item) => String(item.id) === lodgingId) ?? lodgings[0];
  const roomOptions = useMemo(() => buildRoomOptions(lodging), [lodging]);
  const propertyStory = useMemo(() => buildPropertyStory(lodging), [lodging]);
  const galleryImages = useMemo(() => buildGalleryImages(lodging.image), [lodging.image]);
  const reviewAverage = useMemo(
    () => (lodgingReviews.reduce((sum, item) => sum + Number(item.score), 0) / lodgingReviews.length).toFixed(1),
    [],
  );
  const [selectedRoom, setSelectedRoom] = useState(roomOptions[0]);
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const [wishlisted, setWishlisted] = useState(false);
  const [shareLabel, setShareLabel] = useState("공유하기");
  const [reviewDraft, setReviewDraft] = useState({ score: 5, body: "", images: [] });
  const [reviews, setReviews] = useState(lodgingReviews);
  const reviewSectionRef = useRef(null);
  const roomBaseMeta = getRoomMeta(selectedRoom.name);
  const canWriteReview = useMemo(
    () => myBookingRows.some((booking) => booking.lodgingId === lodging.id && booking.status === "COMPLETED"),
    [lodging.id]
  );

  useEffect(() => {
    if (location.hash !== "#reviews") return;
    const timer = window.setTimeout(() => {
      reviewSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [location.hash]);

  const handleShare = async () => {
    const targetUrl = `${window.location.origin}/lodgings/${lodging.id}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(targetUrl);
        setShareLabel("링크 복사됨");
        window.setTimeout(() => setShareLabel("공유하기"), 1800);
      }
    } catch {
      setShareLabel("공유하기");
    }
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const body = reviewDraft.body.trim();
    if (!body) return;

    const nextReview = {
      author: "내 후기",
      score: reviewDraft.score.toFixed(1),
      stay: "방금 작성",
      body,
      images: reviewDraft.images,
    };

    setReviews((current) => [nextReview, ...current]);
    setReviewDraft({ score: 5, body: "", images: [] });
  };

  const handleReviewImages = (event) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    const nextImages = files.slice(0, 3).map((file) => URL.createObjectURL(file));
    setReviewDraft((current) => ({ ...current, images: nextImages }));
  };

  const renderStars = (score) => {
    const numericScore = Number(score);
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFull = numericScore >= starValue;
      const isHalf = !isFull && numericScore >= starValue - 0.5;
      return (
        <span
          key={`${numericScore}-${starValue}`}
          className={`review-star-display${isFull ? " is-full" : ""}${isHalf ? " is-half" : ""}`}
          aria-hidden="true"
        >
          ★
        </span>
      );
    });
  };

  const renderInteractiveStars = (score, onChange) =>
    Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFull = score >= starValue;
      const isHalf = !isFull && score >= starValue - 0.5;

      return (
        <span key={`interactive-${starValue}`} className="detail-review-star-wrap">
          <button
            type="button"
            className="detail-review-star-hit detail-review-star-hit-left"
            onClick={() => onChange(starValue - 0.5)}
            aria-label={`${starValue - 0.5}점`}
          />
          <button
            type="button"
            className="detail-review-star-hit detail-review-star-hit-right"
            onClick={() => onChange(starValue)}
            aria-label={`${starValue}점`}
          />
          <span
            className={`detail-review-star-visual${isFull ? " is-full" : ""}${isHalf ? " is-half" : ""}`}
            aria-hidden="true"
          >
            ★
          </span>
        </span>
      );
    });

  return (
    <div className="container page-stack">
      <section className="lodging-hero">
        <div className="lodging-hero-visual" style={{ backgroundImage: `url(${selectedImage})` }} />
        <div className="lodging-hero-copy">
          <p className="eyebrow hero-eyebrow">{lodging.region}</p>
          <h1>{lodging.name}</h1>
          <p>{lodging.intro}</p>
          <div className="detail-hero-meta">
            <span>{lodging.region} · {lodging.district}</span>
            <button
              type="button"
              className="detail-hero-review-chip"
              onClick={() => reviewSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              ★ {lodging.rating} · {lodging.reviewCount}
            </button>
            <span>{lodging.cancellation}</span>
          </div>
          <div className="feature-chip-row">
            {lodging.highlights.map((item) => (
              <span key={item} className="inline-chip inline-chip-light">
                {item}
              </span>
            ))}
          </div>
          <div className="hero-actions">
            <Link className="primary-button" to={`/booking/${lodging.id}`}>
              예약하기
            </Link>
            <button type="button" className={`detail-utility-button detail-utility-button-like${wishlisted ? " is-active" : ""}`} onClick={() => setWishlisted((current) => !current)}>
              {wishlisted ? "찜 완료" : "찜하기"}
            </button>
            <button type="button" className="detail-utility-button detail-utility-button-share" onClick={handleShare}>
              {shareLabel}
            </button>
          </div>
        </div>
      </section>
      <div className="detail-gallery-strip">
        {galleryImages.map((image, index) => (
          <button
            key={`${lodging.id}-${index}`}
            type="button"
            className={`detail-gallery-thumb${selectedImage === image ? " is-active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => setSelectedImage(image)}
            aria-label={`숙소 사진 ${index + 1}`}
          />
        ))}
      </div>
      <div className="detail-photo-meta">
        <strong>숙소 사진 {galleryImages.indexOf(selectedImage) + 1}</strong>
        <span>{selectedRoom.name} 기준 객실/공용 공간 이미지를 먼저 확인하세요.</span>
      </div>

      <section className="detail-grid">
        <section className="detail-main">
          <div className="detail-headline">
            <span className="small-label">숙소 정보</span>
            <h2>{lodging.region} · {lodging.type}</h2>
            <p>{lodging.address}</p>
            <p>{lodging.intro}</p>
          </div>

          <div className="detail-info-rail">
            <div className="detail-info-item">
              <strong>평점</strong>
              <p>★ {lodging.rating} · {lodging.reviewCount}</p>
            </div>
            <div className="detail-info-item">
              <strong>체크인</strong>
              <p>{lodging.checkInTime}</p>
            </div>
            <div className="detail-info-item">
              <strong>체크아웃</strong>
              <p>{lodging.checkOutTime}</p>
            </div>
            <div className="detail-info-item">
              <strong>취소 정책</strong>
              <p>{lodging.cancellation}</p>
            </div>
          </div>

          <section className="detail-review-section">
            <div className="detail-headline">
              <span className="small-label">객실 선택</span>
              <h2>예약 가능한 객실</h2>
              <p>{lodging.room}</p>
            </div>
            <div className="room-option-list">
              {roomOptions.map((room) => (
                <button
                  key={room.name}
                  type="button"
                  className={`room-option-card${selectedRoom.name === room.name ? " is-active" : ""}`}
                  onClick={() => setSelectedRoom(room)}
                >
                  <div className="room-option-visual" style={{ backgroundImage: `url(${room.image})` }}>
                    <span>{room.badge}</span>
                  </div>
                  <div className="room-option-body">
                    <div className="room-option-top">
                      <strong>{room.name}</strong>
                      <span>{getRoomMeta(room.name)}</span>
                    </div>
                    <p>{room.description}</p>
                    <div className="room-option-meta">
                      <span>{lodging.checkInTime} 체크인</span>
                      <span>{lodging.checkOutTime} 체크아웃</span>
                      <span>{getRoomMeta(room.name)}</span>
                    </div>
                    <div className="room-option-inline">
                      <span>{getRoomCapacity(room.name)}</span>
                      <span>{room.badge}</span>
                      <span>{room.description.split(" · ")[0]}</span>
                    </div>
                    <div className="room-option-bottom">
                      <div className="room-option-price">
                        {room.originalPrice ? <em>{getDiscountRate(room.price, room.originalPrice)} 할인</em> : null}
                        {room.originalPrice ? <span>{room.originalPrice}</span> : null}
                        <strong>{room.price}</strong>
                      </div>
                      <span>1박 기준</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="detail-review-section">
            <div className="detail-headline">
              <span className="small-label">숙소 소개</span>
            </div>
            <div className="detail-story">
              {propertyStory.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>

          <section className="detail-review-section">
            <div className="detail-headline">
              <span className="small-label">기본 정보</span>
              <h2>이용 안내</h2>
            </div>
            <div className="detail-guide-list">
              <div className="detail-guide-item">
                <strong>기본 정보</strong>
                <ul className="detail-guide-bullets">
                  <li>{lodging.checkInTime} 체크인 · {lodging.checkOutTime} 체크아웃</li>
                  <li>{lodging.room}</li>
                  <li>{lodging.type}</li>
                </ul>
              </div>
              <div className="detail-guide-item">
                <strong>투숙객 혜택</strong>
                <ul className="detail-guide-bullets">
                  {lodging.highlights.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="detail-guide-item">
                <strong>확인 사항</strong>
                <ul className="detail-guide-bullets">
                  <li>{lodging.cancellation}</li>
                  <li>{lodging.benefit}</li>
                  <li>객실별 취소 규정과 포함 혜택을 확인하세요.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="detail-review-section">
            <div className="detail-headline">
              <span className="small-label">위치</span>
              <h2>숙소 위치</h2>
            </div>
            <StayMap items={[lodging]} selectedId={lodging.id} height={360} single />
          </section>

          <section ref={reviewSectionRef} className="detail-review-section">
            <div className="detail-headline">
              <span className="small-label">리뷰</span>
              <h2>최근 이용 후기</h2>
            </div>
            <div className="review-summary-strip">
              <span className="accent-rating">★ {reviewAverage}</span>
              <span>{lodging.reviewCount}</span>
              <span className="accent-benefit">{lodging.benefit}</span>
              <span>{lodging.cancellation}</span>
            </div>
            {canWriteReview ? (
              <form className="detail-review-form" onSubmit={handleReviewSubmit}>
                <div className="detail-review-form-head">
                  <strong>후기 작성</strong>
                  <div className="detail-review-stars" role="radiogroup" aria-label="별점 선택">
                    {renderInteractiveStars(reviewDraft.score, (score) =>
                      setReviewDraft((current) => ({ ...current, score }))
                    )}
                  </div>
                </div>
                <textarea
                  className="detail-review-textarea"
                  rows="4"
                  placeholder="객실 상태, 위치, 서비스 경험을 남겨보세요."
                  value={reviewDraft.body}
                  onChange={(event) => setReviewDraft((current) => ({ ...current, body: event.target.value }))}
                />
                <div className="detail-review-upload">
                  <label className="detail-review-upload-button">
                    사진 첨부
                    <input type="file" accept="image/*" multiple onChange={handleReviewImages} hidden />
                  </label>
                  {reviewDraft.images.length ? (
                    <div className="detail-review-upload-preview">
                      {reviewDraft.images.map((image) => (
                        <div key={image} className="detail-review-upload-thumb" style={{ backgroundImage: `url(${image})` }} />
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="detail-review-form-foot">
                  <span>{reviewDraft.body.trim().length}자</span>
                  <button type="submit" className="primary-button detail-review-submit">
                    후기 등록
                  </button>
                </div>
              </form>
            ) : (
              <div className="detail-review-gate">
                <strong>숙박 완료 예약 후 후기 작성 가능</strong>
                <p>설계 기준에 따라 숙박 완료된 예약에 대해서만 리뷰를 등록할 수 있습니다.</p>
                <Link className="secondary-button" to="/my/bookings">
                  내 예약에서 완료 내역 보기
                </Link>
              </div>
            )}
            <div className="detail-review-list">
              {reviews.map((item, index) => (
                <article key={`${item.author}-${item.stay}`} className="detail-review-item">
                  <div className="detail-review-head">
                    <strong>{item.author}</strong>
                    <span className="detail-review-stars-readonly">
                      {renderStars(item.score)}
                      <em>{item.stay}</em>
                    </span>
                  </div>
                  <p>{item.body}</p>
                  <div className="detail-review-gallery">
                    {(item.images?.length ? item.images : galleryImages.slice(0, 2)).map((image, imageIndex) => (
                      <div
                        key={`${item.author}-${imageIndex}`}
                        className="detail-review-thumb"
                        style={{ backgroundImage: `url(${image}${item.images?.length ? "" : index === 1 ? "&sat=6" : ""})` }}
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        <aside className="sticky-booking-card">
          <span className="small-label">예약 요약</span>
          <div className="sticky-booking-room">
            <div className="sticky-booking-room-visual" style={{ backgroundImage: `url(${selectedRoom.image})` }} />
            <div className="sticky-booking-room-copy">
              <strong>{getRoomTitle(selectedRoom.name)}</strong>
              <span>{getRoomCapacity(selectedRoom.name)} · {roomBaseMeta}</span>
            </div>
          </div>
          <div className="sticky-booking-price">
            {selectedRoom.originalPrice ? <span className="sticky-booking-strike">{selectedRoom.originalPrice}</span> : null}
            <strong>{selectedRoom.price}</strong>
            <span>1박 기준</span>
          </div>
          <div className="sticky-booking-meta">
            <span>★ {lodging.rating}</span>
            <span>{lodging.reviewCount}</span>
          </div>
          <div className="sticky-booking-note">
            <p><span className="sticky-booking-dot" aria-hidden="true" />{selectedRoom.description}</p>
            <p><span className="sticky-booking-dot" aria-hidden="true" />체크인 {lodging.checkInTime} · 체크아웃 {lodging.checkOutTime}</p>
            <p><span className="sticky-booking-dot" aria-hidden="true" />{lodging.cancellation}</p>
          </div>
          <div className="sticky-booking-facts">
            <div>
              <span>객실 혜택</span>
              <strong>{selectedRoom.badge}</strong>
            </div>
            <div>
              <span>주요 조건</span>
              <strong>{lodging.highlights[0]}</strong>
            </div>
          </div>
          <div className="sticky-booking-facts">
            <div>
              <span>위치</span>
              <strong>{lodging.region} · {lodging.district}</strong>
            </div>
            <div>
              <span>선택 객실</span>
              <strong>{roomBaseMeta}</strong>
            </div>
          </div>
          <div className="feature-chip-row">
            <span className="inline-chip">즉시 확정</span>
            <span className="inline-chip">무료 취소 확인</span>
          </div>
          <Link
            className="primary-button booking-card-button"
            to={`/booking/${lodging.id}?room=${encodeURIComponent(selectedRoom.name)}`}
          >
            객실 선택 후 예약
          </Link>
        </aside>
      </section>
    </div>
  );
}
