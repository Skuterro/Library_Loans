interface WrapperProps {
  children? :React.ReactNode;
}

export const Wrapper = ({children}: WrapperProps) => {
  return <div className="relative max-w-screen-xl mx-auto px-4 lg:px-8 overflow-x-hidden">
    {children}
  </div>
}