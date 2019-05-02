def prepare_text_document_structure(text_document):
    return {
        'text': text_document['text'],
        'language': text_document['language'],
        'expireTime': text_document['expire_time'],
        'identifier': text_document['identifier'],
        'userIdentifier': text_document['user_identifier']
    }
