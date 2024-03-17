import classNames from 'classnames'
import React from 'react'
import { File, types, Text, RichText } from 'react-bricks/frontend'
//import blockNames from '../blockNames'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { FcDownload } from 'react-icons/fc'
import { FcDocument } from 'react-icons/fc'
import blockNames from '../blockNames'
export interface DocumentProps {
  color?: { color: string; className: string }
  withSize?: boolean
}

const formatFileSize = (bytes: number) => {
  if (!bytes) return ''
  if (bytes < 1) {
    return `${bytes.toFixed(1)} B`
  }
  if (bytes < 1024) {
    return `${bytes.toFixed(0)} B`
  } else {
    return `${(bytes / 1024).toFixed(0)} KB`
  }
}

const Document: types.Brick<DocumentProps> = ({ withSize }) => {
  return (
    <div className="p-7 flex border border-black/10 dark:border-white/10 bg-white dark:bg-white/10 rounded">
      <File
        propName="file"
        allowedExtensions={['pdf']}
        renderBlock={(file) => {
          return file ? (
            <div className="flex">
              <div className="text-center text-xs text-gray-600 font-semibold mr-4 pt-1 dark:text-white/60">
                <FcDocument size={'40px'} />
              </div>

              <div className="w-full">
                <Text
                  propName="fileName"
                  placeholder="file name..."
                  renderBlock={(props) => (
                    <div
                      className="font-bold mb-1 text-gray-800 dark:text-white"
                      {...props.attributes}
                    >
                      {props.children}
                    </div>
                  )}
                />
                <RichText
                  renderBlock={(props) => (
                    <div
                      className="text-gray-600 font-normal dark:text-white/60"
                      {...props.attributes}
                    >
                      {props.children}
                    </div>
                  )}
                  placeholder="File description..."
                  propName="fileDescription"
                />

                <a
                  target="_blank"
                  href={file.url}
                  className={
                    'w-full mt-2 flex items-center text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 hover:-translate-y-px transition-all ease-out duration-150'
                  }
                >
                  <Text
                    renderBlock={(props) => (
                      <span className="align-middle" {...props.attributes}>
                        {props.children}
                      </span>
                    )}
                    placeholder=""
                    propName="linkText"
                  />
                  {withSize && !!file.size && (
                    <span className="p-1 rounded bg-gray-100 text-gray-500 text-xs ml-2">
                      {formatFileSize(file.size)}
                    </span>
                  )}
                </a>
              </div>
            </div>
          ) : (
            <div className="flex font-semibold h-full items-center dark:text-white">
              <AiOutlineFileAdd
                className="mr-2 text-sky-500 dark:text-sky-400"
                size={'40px'}
              />
              Add document
            </div>
          )
        }}
      />
    </div>
  )
}

Document.schema = {
  name: blockNames.Document,
  label: 'Document',
  category: 'documents',
  hideFromAddMenu: true,
  playgroundLinkLabel: 'View source code on Github',
  playgroundLinkUrl:
    'https://github.com/ReactBricks/react-bricks-ui/blob/master/src/website/Documents/Document.tsx',
  getDefaultProps: () => ({
    fileName: 'Document name',
    fileDescription: 'Description of this document',
    linkText: 'Download now',
    withSize: true,
  }),
  sideEditProps: [
    {
      name: 'withSize',
      label: 'Show document size',
      type: types.SideEditPropType.Boolean,
    },
    { name: 'fileName', label: 'file name', type: types.SideEditPropType.Text },
    {
      name: 'fileDescription',
      label: 'File description',
      type: types.SideEditPropType.Textarea,
    },
    { name: 'linkText', label: 'Link text', type: types.SideEditPropType.Text },
  ],
}
export default Document
