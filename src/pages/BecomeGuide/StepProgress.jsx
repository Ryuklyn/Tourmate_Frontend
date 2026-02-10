import React from "react";
import { Check, Circle } from "lucide-react";

export default function StepProgress({ steps, activeStep }) {
  return (
    <div className="w-full max-w-4xl flex items-center justify-between mt-5">
      {steps.map((step, index) => {
        const isCompleted = index + 1 < activeStep;
        const isCurrent = index + 1 === activeStep;
        const isUpcoming = index + 1 > activeStep;

        return (
          <div
            key={index}
            className="flex flex-col items-center relative flex-1"
          >
            {/* Circle */}
            {isCompleted ? (
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Check size={22} />
              </div>
            ) : isCurrent ? (
              <div className="w-10 h-10 rounded-full border-[3px] bg-blue-600 text-white flex items-center justify-center font-semibold">
                {index + 1}
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold">
                {index + 1}
              </div>
            )}

            {/* Label */}
            <p
              className={`text-sm mt-1 ${
                isCompleted || isCurrent
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {step}
            </p>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2 w-20 border-t-4 
                  ${
                    isCompleted
                      ? "border-blue-600"
                      : isCurrent
                      ? "border-gray-300"
                      : "border-gray-300"
                  }
                `}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
