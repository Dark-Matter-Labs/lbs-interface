import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div className="bg-gray-200 ">
      <NavBar current="contact" />
      <div className="global-margin mx-auto max-w-2xl pb-52">
        <h1 className="uppercase py-8 bg-dark-wood-800 text-white-200 px-10 text-center">
          Contact
        </h1>
        <div className="border border-dark-wood-800 rounded-[50px] py-10 px-8 mt-10">
          <h3>treesai@darkmatterlabs.org</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
}
