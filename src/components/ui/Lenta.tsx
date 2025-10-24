import WinnersLogo from "../../widgets/WinnersLogo";


const Lenta = () => {
  return (
    <div 
    // data-aos="zoom-in"
    data-aos="flip-right"
    //data-aos="fade-right"
    className="bg-black">
      <div className="flex pt-4 items-center justify-between">
        <WinnersLogo />
        <WinnersLogo />
        <WinnersLogo />
        <WinnersLogo />
        <WinnersLogo />
      </div>
    </div>
  );
};

export default Lenta;
