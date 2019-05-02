def prepare_text_document_structure(text_document):
    return {
        'text': text_document['text'],
        'language': text_document['language'],
        'expire_time': text_document['expire_time'],
        'identifier': text_document['identifier'],
        'user_identifier': text_document['user_identifier']
    }
