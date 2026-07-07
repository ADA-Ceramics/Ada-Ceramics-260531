// 全站表单统一的附件处理工具（与 /api/contact 的 attachments 字段兼容）

export const MAX_TOTAL_ATTACHMENT_SIZE = 10 * 1024 * 1024 // 10MB 附件总大小上限

/** 允许的附件类型：图片、PDF、Word、Excel、AI、ZIP */
export const ATTACHMENT_ACCEPT = "image/*,.pdf,.doc,.docx,.xls,.xlsx,.ai,.zip"

/** 附件说明文案，与 UI 提示保持一致 */
export const ATTACHMENT_HINT = "Optional. Images, PDF, Word, Excel, AI, ZIP. Max 10MB total."

export interface EncodedAttachment {
  filename: string
  content: string
}

/** 将文件读取为 base64 dataURL，供 /api/contact 发送 */
export function readFileAsBase64(file: File): Promise<EncodedAttachment> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve({ filename: file.name, content: String(reader.result) })
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * 合并已选文件与新选文件，并校验总大小。
 * 超过上限时返回 null（调用方据此提示用户）。
 */
export function mergeFilesWithinLimit(current: File[], incoming: File[]): File[] | null {
  const next = [...current, ...incoming]
  const total = next.reduce((sum, f) => sum + f.size, 0)
  if (total > MAX_TOTAL_ATTACHMENT_SIZE) return null
  return next
}
