// @flow

// $FlowFixMe
import React, { forwardRef, useImperativeMethods } from 'react'

import { debug } from './utils'
import { useScope, useRender, useResize } from './hooks'

import type { Node } from 'react'

type Props = {
  children?: Node,
  settings?: Object,
}

const View = forwardRef(({ children, settings, ...other }: Props, ref: any) => {
  const { scope, canvas } = useScope(settings)
  useRender(scope, canvas, children)
  useResize(scope, canvas)

  useImperativeMethods(ref, () => ({
    getCanvas: () => canvas,
    getScope: () => scope,
  }))

  debug('[view] *************')

  return <canvas {...other} ref={canvas} />
})

View.displayName = 'View'

export default View
