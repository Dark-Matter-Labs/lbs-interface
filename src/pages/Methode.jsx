import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Methode() {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t(`method.faq_1`),
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: t(`method.faq_2`),
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: t(`method.faq_3`),
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: t(`method.faq_4`),
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: t(`method.faq_5`),
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
  ];

  return (
    <div className="bg-gray-200">
      <NavBar current="method" />
      <div className="global-margin  ">
        <h1 className="uppercase py-8 bg-green-500 text-white-200 px-10 text-center">
          {t(`method.title`)}
        </h1>
        <h3 className="py-4">{t(`method.subtitle`)}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-2">
          <div className="border border-dark-wood-800 rounded-[10px] px-8 bg-white-300">
            <p className="book-intro-sm  pt-10 pb-4">
              {t(`method.intro_para`)}
            </p>
            <button
              type="button"
              className="bold-intro-sm  rounded-full bg-green-600 my-4 py-2 px-4 text-white-200 shadow-sm hover:bg-dark-wood-700 "
            >
              {t(`method.button_tech`)}
            </button>
            <br />
            <button
              type="button"
              className="bold-intro-sm  rounded-full bg-green-600 my-4 py-2 px-4 text-white-200 shadow-sm hover:bg-dark-wood-700 "
            >
              {t(`method.button_paper`)}
            </button>
          </div>
          <div className="border border-green-500 rounded-[10px] px-8 bg-white-300">
            <p className="book-intro-sm pt-10 pb-4">
              <span className="bold-intro-sm">{t(`method.nbs_title`)}</span>{" "}
              {t(`method.nbs_para`)}
            </p>
            <hr className=" border-8 border-green-600" />
            <p className="book-intro-sm py-4">
              <span className="bold-intro-sm">{t(`method.cloud_title`)}</span>{" "}
              {t(`method.cloud_para`)}
            </p>
          </div>
          <div className="border border-green-500 rounded-[10px] px-8 bg-white-300">
            <p className="book-intro-sm pt-10 pb-4">
              <span className="bold-intro-sm">{t(`method.es_title`)}</span>{" "}
              {t(`method.es_para`)}
            </p>
            <hr className=" border-8 border-green-600" />
            <p className="book-intro-sm py-4">
              <span className="bold-intro-sm">{t(`method.monitor_title`)}</span>{" "}
              {t(`method.monitor_para`)}
            </p>
          </div>
        </div>

        <h2 className=" py-8 bg-green-500 text-white-200 px-10 text-center mt-20 max-w-xl mx-auto rounded-[10px]">
          LBS {t(`method.title`)}
        </h2>
        <div className="max-w-4xl px-10 py-8 border rounded-[10px] border-green-600 mx-auto book-intro-sm mb-40 bg-white">
          <p>{t(`method.section_intro`)}</p>
          <ol>
            <li>{t(`method.section_bullet_1`)}</li>
            <li>{t(`method.section_bullet_2`)}</li>
            <li>{t(`method.section_bullet_3`)}</li>
          </ol>
          <p className="pt-8">{t(`method.section_explain`)}</p>
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 ">
              <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                <dl className="mt-2 space-y-6 divide-y divide-gray-900/10">
                  {faqs.map((faq) => (
                    <Disclosure key={faq.question} as="div" className="pt-6">
                      <dt>
                        <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                          <span className="medium-intro-lg  text-green-600">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <PlusSmallIcon
                              aria-hidden="true"
                              className="h-8 w-8 group-data-[open]:hidden text-green-600"
                            />
                            <MinusSmallIcon
                              aria-hidden="true"
                              className="h-8 w-8 [.group:not([data-open])_&]:hidden text-green-600"
                            />
                          </span>
                        </DisclosureButton>
                      </dt>
                      <DisclosurePanel as="dd" className="mt-2 pr-12">
                        <p className="medium-intro-md  text-gray-600">
                          {faq.answer}
                        </p>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
