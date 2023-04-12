export type ModalSideProps = {
  isVisible: boolean;
  onClose: () => void;
  className?: string;
  backdrop?: boolean;
  renderCustomCross?: (onClose: () => void) => React.ReactNode;
};
