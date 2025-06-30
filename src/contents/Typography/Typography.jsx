import './Typography.css'

export default function Typography({
  as = 'p',
  variant = '',
  className = '',
  children,
  ...props
}) {
  const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'lead']

  const Tag = as === 'heading' && headingTags.includes(variant) ? variant : 'p'

  const variantClass = as === 'p' && headingTags.includes(variant) ? variant : ''

  const finalClass = [variantClass, className].filter(Boolean).join(' ') || undefined

  return (
    <Tag {...props} className={finalClass}>
      {children}
    </Tag>
  )
}