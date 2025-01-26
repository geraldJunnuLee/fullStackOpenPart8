import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_DATA, EDIT_AUTHOR } from "../queries";

const Authors = ({ authors, show }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_DATA }],
  })

  const submit = async (event) => {
    event.preventDefault()
    await editAuthor({ variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  const handleSelectChange = (event) => {
    setName(event.target.value);
  }

  console.log("name", name)

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select onChange={handleSelectChange} value={name}>
            <option value="" disabled>
              Select a name
            </option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>{author.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)}/>
        </div>
        <button type="submit">update author</button>

      </form>
    </div>
  )
}

Authors.propTypes = {
  authors: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
}

export default Authors
