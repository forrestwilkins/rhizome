import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type ToneType from 'tone';

type ToneJS = typeof ToneType;

export let Tone: ToneJS | null = null;

export const getToneJS = async (): Promise<ToneJS> => {
  if (!Tone) {
    const Tone = await import('tone');
    return Tone;
  }
  return Tone;
};

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};
