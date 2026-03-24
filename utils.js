// =====================================================
// УТИЛИТЫ ДЛЯ РАБОТЫ С BASE64 МЕДИАФАЙЛАМИ
// =====================================================

/**
 * Определяет MIME-тип по расширению файла
 */
function getMimeType(filename) {
    if (!filename) return 'application/octet-stream';
    
    const ext = filename.split('.').pop().toLowerCase();
    const mimeTypes = {
        // Изображения
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'svg': 'image/svg+xml',
        // Аудио
        'mp3': 'audio/mpeg',
        'wav': 'audio/wav',
        'ogg': 'audio/ogg',
        'mp4': 'audio/mp4',
        'm4a': 'audio/mp4',
        // Документы
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'doc': 'application/msword',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'xls': 'application/vnd.ms-excel',
        'pdf': 'application/pdf'
    };
    return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * Проверяет, является ли строка base64
 */
function isBase64(str) {
    if (!str || typeof str !== 'string') return false;
    // Проверяем data URI
    if (str.startsWith('data:')) return true;
    // Проверяем чистый base64 (без пути к файлу)
    if (str.includes('/') || str.includes('\\')) return false;
    // Базовая проверка на base64 символы
    const base64Regex = /^[A-Za-z0-9+/=]+$/;
    return str.length > 100 && base64Regex.test(str.replace(/\s/g, ''));
}

/**
 * Извлекает MIME-тип из data URI
 */
function getMimeFromDataUri(dataUri) {
    const match = dataUri.match(/^data:([^;]+);base64,/);
    return match ? match[1] : 'application/octet-stream';
}

/**
 * Конвертирует base64 в Blob URL
 */
function base64ToBlobUrl(base64Data, mimeType) {
    try {
        let pureBase64 = base64Data;
        
        // Убираем data URI prefix если есть
        if (base64Data.startsWith('data:')) {
            const parts = base64Data.split(',');
            pureBase64 = parts[1];
            mimeType = getMimeFromDataUri(base64Data);
        }
        
        // Декодируем base64
        const byteCharacters = atob(pureBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        
        // Создаём Blob и URL
        const blob = new Blob([byteArray], { type: mimeType });
        return URL.createObjectURL(blob);
    } catch (e) {
        console.error('Ошибка конвертации base64:', e);
        return null;
    }
}

/**
 * Получает URL для медиа (работает с путями и base64)
 */
function getMediaUrl(source, fileExtension) {
    if (!source) return null;
    
    // Если это base64
    if (isBase64(source)) {
        const mimeType = source.startsWith('data:') 
            ? getMimeFromDataUri(source) 
            : getMimeType(fileExtension);
        return base64ToBlobUrl(source, mimeType);
    }
    
    // Если это обычный путь — возвращаем как есть
    return source;
}

/**
 * Создаёт ссылку для скачивания
 */
function createDownloadLink(linkElement, source, filename) {
    if (!source || !linkElement) return;
    
    if (isBase64(source)) {
        const mimeType = getMimeType(filename);
        const blobUrl = base64ToBlobUrl(source, mimeType);
        if (blobUrl) {
            linkElement.href = blobUrl;
            linkElement.download = filename;
        }
    } else {
        linkElement.href = source;
        linkElement.download = filename;
    }
}

/**
 * Обрабатывает изображения с атрибутом data-src
 */
function processBase64Images() {
    document.querySelectorAll('img[data-src]').forEach(img => {
        const source = img.getAttribute('data-src');
        const url = getMediaUrl(source, 'jpg');
        if (url) {
            img.src = url;
        }
    });
}

/**
 * Очистка Blob URL при уходе со страницы
 */
function cleanupBlobUrls() {
    const selectors = 'img[src^="blob:"], audio[src^="blob:"], a[href^="blob:"]';
    document.querySelectorAll(selectors).forEach(el => {
        const url = el.src || el.href;
        if (url && url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
        }
    });
}

// Автоматическая очистка при уходе со страницы
window.addEventListener('beforeunload', cleanupBlobUrls);
