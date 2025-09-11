export default function WelcomeBanner() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <video
        src={"/videos/newIntro.mp4"}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}