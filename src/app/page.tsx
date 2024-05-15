import Image from "next/image";
import Navbar from "./Components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Image
        src="/images/bg4.jpg"
        alt="background"
        width={500}
        height={500}
        className="fixed top-0 left-0 w-full z-0 opacity-90"
      />
      <div className="hero relative h-screen">
        <div className="flex justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
          <div className="bg-white p-10">
            <p className="text-5xl italic font-bold">
              <span className="text-red-700">A</span>CHIEVERS{" "}
              <span className="text-red-700">A</span>CADEMY
            </p>
            <p className="text-xl italic font-bold">
              EMPOWERING DREAMS IGNITING SUCCESS!!
            </p>
          </div>
          <div className="bg-white z-10"></div>
        </div>
      </div>
      <div className="bg-white p-10 z-30 relative" id="about">
        <h1 className="text-center text-3xl font-bold p-2 underline-offset-4 underline">
          <span className="text-5xl italic font-mono text-red-700">M</span>
          ESSAGE FROM THE FOUNDERS
        </h1>
        <div className="text-lg font-semibold p-5 text-justify">
          <p className="">
            Achiever's Academy welcomes you all who are embarked on this
            remarkable journey towards a brighter future.As you step into this
            arena of learning, we want you to recognize the immense potential
            within yourselves. You are not just here to prepare for exams; you
            are here to sculpt your destinies to carve out a path that leads to
            the fulfillment of your aspirations. In this pursuit, remember that
            success is not a destination; it is a journey, a journey that
            demands dedication, perseverance, and an unyielding belief in your
            abilities.
          </p>
          <br />
          <p>
            Founding Achiever's Academy was not just a professional endeavor; it
            was a passionate response to the educational aspirations of the
            vibrant community in Dibrugarh. In our collective experience, we
            recognized the need for an institution that goes beyond the
            conventional, one that becomes a nurturing ground for aspirations
            and a catalyst for academic success.
          </p>
          <br />
          <p>
            Our vision for Achiever's Academy is rooted in the core belief that
            every student has the potential to achieve greatness. This message
            serves as a testament to the guiding principles that shape the
            essence of Achiever's Academy and our journey which has been marked
            by a commitment to excellence and a deep-seated belief in the
            transformative power of education.
          </p>
        </div>
      </div>
      <div className="courses"></div>
      <div className="testimonials"></div>
      <div className="contact"></div>
    </main>
  );
}
