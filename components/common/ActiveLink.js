import { withRouter } from 'next/router'

const ActiveLink = withRouter(({ children, router, href }) => {
  const className = router.asPath === href ? 'is-active' : ''
  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }
  return (
    <li>
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    </li>
  )
})
export default ActiveLink
