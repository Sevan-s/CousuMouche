

export default function WelcomeBanner() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <video
        src={"/videos/cmVideo.mp4"}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-1/2 h-full -translate-x-1/2 object-cover rounded-lg"
      />
    </div>
  );
}