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
    color: 'bg-orange-600',
    icon: 'power-plug-outline' // these are just examples, you can use any icon/icon library you want
  },
  NO_OUTLETS: {
    color: 'bg-red-600',
    icon: 'power-plug-off-outline'
  },
  WHITEBOARD: {
    color: 'bg-blue-600',
    icon: 'human-male-board'
  },
  CHALKBOARD: {
    color: 'bg-green-600',
    icon: 'pencil'
  },
  // so on and so forth for each possible label in StudySpace Entities
} as const

type Label = keyof typeof LABEL_DISPLAY

export {
  LABEL_DISPLAY,
  Label
}