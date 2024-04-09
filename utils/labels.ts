/**
 * This file contains the definition for how room labels are displayed in the UI.
 *
 * Keep this up to date with the labels on StudySpace Entities as those are
 * what you will be receiving from the server.
 *
 * We also export some types to make our code more readable and maintainable.
 */

const LABEL_DISPLAY = {
  OUTLETS: {
    color: 'bg-yellow-500',
    icon: 'mdi-power' // these are just examples, you can use any icon/icon library you want
  },
  NO_OUTLETS: {
    color: 'bg-red-500',
    icon: 'mdi-power-off'
  },
  WHITEBOARD: {
    color: 'bg-blue-500',
    icon: 'mdi-whiteboard'
  },
  CHALKBOARD: {
    color: 'bg-green-500',
    icon: 'mdi-chalkboard'
  },
  // so on and so forth for each possible label in StudySpace Entities
} as const

type Label = keyof typeof LABEL_DISPLAY

export {
  LABEL_DISPLAY,
  Label
}