import { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { DialogHeaderContainer } from '@/components/Modal/index.style.ts'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  subtitle?: string
  content: ReactNode
  footer?: ReactNode
}

function Modal({ open, onOpenChange, title, subtitle, content, footer }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {(title || subtitle) && <DialogHeaderContainer>
          {title && <DialogTitle>
            <div>{title}</div>
          </DialogTitle>}

          {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
        </DialogHeaderContainer>}

        {content}

        {footer && <DialogFooter className="mt-2">
          {footer}
        </DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
