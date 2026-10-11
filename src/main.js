import './style.css'

const sidebar = document.querySelector('#sidebar')
const overlay = document.querySelector('#sidebar-overlay')
const openSidebarButton = document.querySelector('#open-sidebar')
const closeSidebarButton = document.querySelector('#close-sidebar')

function openSidebar() {
  sidebar.classList.remove('-translate-x-full')
  overlay.classList.remove('hidden')
  document.body.classList.add('overflow-hidden')
}

function closeSidebar() {
  sidebar.classList.add('-translate-x-full')
  overlay.classList.add('hidden')
  document.body.classList.remove('overflow-hidden')
}

openSidebarButton?.addEventListener('click', openSidebar)
closeSidebarButton?.addEventListener('click', closeSidebar)
overlay?.addEventListener('click', closeSidebar)

document.querySelectorAll('#sidebar a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 1024) closeSidebar()
    document.querySelectorAll('#sidebar .nav-link').forEach((item) => {
      item.classList.remove('nav-link-active')
    })
    link.classList.add('nav-link-active')
  })
})

const statusFilter = document.querySelector('#status-filter')
const transactionRows = [...document.querySelectorAll('#transaction-rows tr')]
const transactionCount = document.querySelector('#transaction-count')

function filterTransactions() {
  const selectedStatus = statusFilter.value
  let visible = 0

  transactionRows.forEach((row) => {
    const shouldShow = selectedStatus === 'all' || row.dataset.status === selectedStatus
    row.classList.toggle('hidden', !shouldShow)
    if (shouldShow) visible += 1
  })

  transactionCount.textContent = `Showing ${visible} demo transaction${visible === 1 ? '' : 's'}`
}

statusFilter?.addEventListener('change', filterTransactions)

const searchInputs = [
  document.querySelector('#global-search'),
  document.querySelector('#mobile-search')
].filter(Boolean)

function searchTransactions(value) {
  const query = value.trim().toLowerCase()
  let visible = 0

  transactionRows.forEach((row) => {
    const matches = row.textContent.toLowerCase().includes(query)
    const statusMatches = statusFilter.value === 'all' || row.dataset.status === statusFilter.value
    const shouldShow = matches && statusMatches
    row.classList.toggle('hidden', !shouldShow)
    if (shouldShow) visible += 1
  })

  transactionCount.textContent = `Showing ${visible} matching demo transaction${visible === 1 ? '' : 's'}`
}

searchInputs.forEach((input) => {
  input.addEventListener('input', () => {
    searchInputs.forEach((otherInput) => {
      if (otherInput !== input) otherInput.value = input.value
    })
    searchTransactions(input.value)
  })
})

document.querySelector('#customer-form')?.addEventListener('submit', (event) => {
  event.preventDefault()
  const form = event.currentTarget
  if (!form.reportValidity()) return

  const name = form.elements.name.value.trim()
  const message = document.querySelector('#form-message')
  message.textContent = `Demo customer "${name}" passed validation. This UI does not save customer data to a server.`
  message.classList.remove('hidden')
  form.reset()
})

document.querySelector('#export-button')?.addEventListener('click', () => {
  const rows = [['Transaction', 'Customer', 'Phone', 'Date', 'Amount', 'Status', 'Channel']]
  transactionRows.forEach((row) => {
    if (row.classList.contains('hidden')) return
    const cells = [...row.querySelectorAll('td')]
    rows.push([
      cells[0].innerText.trim(),
      cells[1].querySelector('div')?.innerText.trim() || '',
      cells[1].querySelector('.text-xs')?.innerText.trim() || '',
      cells[2].innerText.trim(),
      cells[3].innerText.trim(),
      cells[4].innerText.trim(),
      cells[5].innerText.trim()
    ])
  })

  const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'momo-demo-transactions.csv'
  anchor.click()
  URL.revokeObjectURL(url)
})

document.querySelector('#view-all')?.addEventListener('click', () => {
  statusFilter.value = 'all'
  searchInputs.forEach((input) => { input.value = '' })
  filterTransactions()
  document.querySelector('#transactions').scrollIntoView({ behavior: 'smooth' })
})
