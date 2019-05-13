import typing as t


def snake_to_camelcase_str(name: str) -> str:
    first_word, *rest = name.split('_')
    return first_word + ''.join(word.title() for word in rest)


def snake_to_camelcase_list(container: t.Iterable[str]) -> t.List[str]:
    return [snake_to_camelcase_str(x) for x in container]


def snake_to_camelcase_dict(mapping: t.Dict[str, t.Any]) -> t.Dict[str, t.Any]:
    return {
        snake_to_camelcase_str(key): value
        for key, value in mapping.items()
    }


def snake_to_camelcase_strategy(data):
    if isinstance(data, dict):
        return snake_to_camelcase_dict(data)
    if isinstance(data, list):
        return snake_to_camelcase_list(data)
    if isinstance(data, str):
        return snake_to_camelcase_str(data)
    raise TypeError
