import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModalStore } from '@/store/use-modal-store'
import { cn } from '@/lib/utils'

const sizeClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  full: 'sm:max-w-[95vw]',
} as const

export function ModalProvider() {
  const { modals, closeModal } = useModalStore()

  return (
    <>
      {modals.map((modal, index) => (
        <Dialog
          key={modal.id}
          open
          onOpenChange={(open) => {
            if (!open) closeModal(modal.id)
          }}
        >
          <DialogContent
            className={cn(sizeClasses[modal.size ?? 'md'], "flex max-h-[90vh] flex-col p-0")}
            style={{ zIndex: 1000 + index * 10 }}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>{modal.title}</DialogTitle>
              {modal.subTitle && (
                <DialogDescription>{modal.subTitle}</DialogDescription>
              )}
            </DialogHeader>
            <div className="flex-1 overflow-y-auto p-6 pt-2">
              {modal.content}
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </>
  )
}
