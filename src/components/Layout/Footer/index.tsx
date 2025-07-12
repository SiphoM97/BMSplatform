import Link from "next/link";
import { Icon } from "@iconify/react";
import { headerData } from "../Header/Navigation/menuData";

const footer = () => {
  return (
    <footer className="bg-deepSlate py-10">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          {/* Clinic Name and Socials */}
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <h1 className="text-2xl font-bold text-primary mb-4">Dr Nkuna & Partners</h1>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-primary text-black text-3xl">
                <Icon icon="tabler:brand-facebook" />
              </Link>
              <Link href="#" className="hover:text-primary text-black text-3xl">
                <Icon icon="tabler:brand-twitter" />
              </Link>
              <Link href="#" className="hover:text-primary text-black text-3xl">
                <Icon icon="tabler:brand-instagram" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-2">
            <h3 className="mb-4 text-2xl font-medium">Links</h3>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className="mb-2 text-black/50 hover:text-primary w-fit">
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location + Contact Info */}
          <div className="col-span-6 md:col-span-6 lg:col-span-6">
            <div className="flex items-center gap-2 mb-6">
              <Icon icon="tabler:brand-google-maps" className="text-primary text-3xl" />
              <h5 className="text-lg text-black/60">777 Sandton Drive, Gauteng, 1921</h5>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <Icon icon="tabler:phone" className="text-primary text-3xl" />
              <h5 className="text-lg text-black/60">+011 3411-4411</h5>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="tabler:folder" className="text-primary text-3xl" />
              <h5 className="text-lg text-black/60">info@doctors.com</h5>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 lg:flex flex-col lg:flex-row items-center justify-between gap-4">
          <h4 className="text-black/50 text-sm text-center lg:text-start font-normal">
            Designed by{" "}
            <Link href="https://hojadigital.co.za" target="_blank" className="hover:text-primary">
               Hoja Digital
            </Link>
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-5 mt-2 lg:mt-0">
            <Link
              href="/login"
              className="text-sm font-medium bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
            >
              Staff Login
            </Link>
            <Link href="/" className="text-black/50 text-sm font-normal hover:text-primary">
              Privacy policy
            </Link>
            <Link href="/" className="text-black/50 text-sm font-normal hover:text-primary">
              Terms & conditionssss
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
