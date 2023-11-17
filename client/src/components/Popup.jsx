export default function Popup(){
  return (
    <div className={`relative bg-black text-white max-w-xs w-11/12 h-fit rounded-lg p-4 pt-2 ${(countdownTimer.days === 0 && countdownTimer.hours === 0 && countdownTimer.minutes === 0) ? "hidden" : "block" } mb-6`}>
      <textarea className="text-base"></textarea>
    </div>
  )
}