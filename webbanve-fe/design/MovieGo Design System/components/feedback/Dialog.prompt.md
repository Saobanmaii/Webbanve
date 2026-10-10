Modal on a blurred black scrim. Use for confirmations ("Cancel booking?"), seat-hold expiry and admin deletes.
```jsx
<Dialog title="Release your seats?" onClose={close} actions={<><Button variant="ghost" onClick={close}>Keep</Button><Button onClick={release}>Release seats</Button></>}>
  Seats F12 and F13 will become available to others.
</Dialog>
```
