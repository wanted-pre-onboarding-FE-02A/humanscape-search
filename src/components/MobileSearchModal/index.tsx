import styles from './MobileSearchModal.module.scss'

interface IProps {
  handleClose: () => void
}

export default function MobileSearchModal({ handleClose }: IProps) {
  const handleSubmit = (e: any) => {
    handleClose()
  }

  return (
    <div>
      <button type='button' onClick={handleClose}>
        sfdsd
      </button>
    </div>
  )
}
