import headerimg from "./assets/header-img.png";
function Landing() {
  return (
    <div className=" font-[Comfortaa] bg-linear-to-b from-[#97AC8F]/80 to-[#3D463A]">
      <div className="relative">
        {/*this is the header part*/}
        <img src={headerimg} className="h-200 mx-auto"></img>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-15">
          <div className="w-155 h-100 flex flex-col justify-center font">
            <h1 className="text-[70px]/[60px] text-center">
              For a better <span className="text-[55px]">community</span>
            </h1>
            <h1 className="text-[20px] text-center mt-10">
              Report local issues, upvote concerns, and stay informed—because
              small actions lead to big changes.
            </h1>
          </div>
          <div className="flex flex-row justify-center mt-10 text-[25px] gap-15">
            <button className="px-10 py-4 rounded-full bg-[#C3DAC977]">
              Login
            </button>
            <button className="px-7 py-4 rounded-full bg-[#C3DAC977]">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div className="py-80">
        {/*this is the body part*/}
        <div className="h-245 mx-30 rounded-4xl bg-[#778875]/80 shadow-xl flex flex-col">
          <div className="h-100 m-10 rounded-3xl bg-[#D9D9D9]">
            <div className="m-10">
              <h1 className="text-[30px]">About</h1>
              <br></br>
              <p className="text-[20px]">
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </p>
            </div>
          </div>
          <div className="h-100 m-10 rounded-3xl bg-[#D9D9D9]">
            <div className="m-10">
              <h1 className="text-[30px]">Features</h1>
              <br></br>
              <p className="text-[20px]">
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Landing;
