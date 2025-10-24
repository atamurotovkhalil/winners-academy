import w from "@/assets/sticker.png";
import A from "@/assets/sticker1.png";


const WinnersLogo = () => {
  return (
    <div className="">
      <div className="flex rounded-full drop-shadow-[-12px_12px_12px_rgba(0,0,0,1)]
      object-cover bg-[#fc8100]/80 px-2 mb-4">
        <div
          className="flex rounded-full m-1 drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
      object-cover  py-1"
        >
          <img className="w-[22px]  pb-3 translate-x-2 " src={w} />
          <img className="w-[22px] pt-3 h-[30px] -translate-x-1 " src={A} />
        </div>
        <div className="text-end sm:hidden hidden drop-shadow-[-2px_2px_2px_rgba(0,0,0,1)]
      object-cover lg:flex md:flex justify-center items-end text-[10px]">
          <p className="italic mb-4 font-bold">
            <span className="text-[#fc8100]  font-bold text-[16px]">W</span>
            <span className="text-black">inners</span>
          </p>
          <span className="italic font-bold">
            {" "}
            <span className="text-[#fc8100] text-[16px]">A</span>
            <span className="text-black">cademy</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WinnersLogo;
