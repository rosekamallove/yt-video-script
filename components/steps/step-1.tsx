"use client"

import { useRef } from "react"
import {
  generateOutlineHandlerAtom,
  inputAtom,
  stepHandlerAtom,
} from "@/atoms/form-atoms"
import { motion } from "framer-motion"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

import { Input } from "@/components/ui/input"

import { Button } from "../ui/button"

const containerVariants = {
  initial: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 30,
  },
}

const Step1 = () => {
  const step = useAtomValue(stepHandlerAtom)
  const [inputValue, setInputValue] = useAtom(inputAtom)
  const generateOutlineHandler = useSetAtom(generateOutlineHandlerAtom)
  const inputRef = useRef<HTMLInputElement>(null)

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.length > 10) {
      inputRef.current?.blur()
    }
    await generateOutlineHandler()
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit={step === 0 ? "initial" : "exit"}
      className="flex flex-col justify-center w-full h-[80vh]"
    >
      <div>
        {/* Content Container */}
        <div className="flex flex-col flex-1 gap-3">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Create video script with AI
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Create your video script with AI. Just write a few sentences and let
            AI first create your outline and then you can generate your video
            script.
          </p>
        </div>
        {/* Input */}
        <form onSubmit={formHandler} className="w-full mt-4 space-y-6">
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            className="w-full text-base"
            placeholder="A video script about SpaceX..."
            ref={inputRef}
          />
          <Button type="submit" className="w-full">
            Create Outline
          </Button>
        </form>
      </div>
    </motion.div>
  )
}

export default Step1
